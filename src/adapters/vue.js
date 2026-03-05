import { ref, onMounted, onUnmounted, readonly } from 'vue';
import { Pollyx } from '../core/Pollyx';

export function usePollingVue(options = {}) {
    const data = ref(null);
    const error = ref(null);
    const isFetching = ref(false);
    const status = ref('idle');

    let pollingInstance = null;
    const elementRef = ref(null);

    onMounted(() => {
        if (!elementRef.value) {
            elementRef.value = document.createElement('div');
        }

        pollingInstance = new Pollyx(elementRef.value, {
            ...options,
            onUpdate: (html, instance) => {
                data.value = html;
                if (options.onUpdate) options.onUpdate(html, instance);
            },
            onError: (err, instance) => {
                error.value = err;
                if (options.onError) options.onError(err, instance);
            },
            onStatusChange: (newStatus, data, instance) => {
                status.value = newStatus;
                isFetching.value = newStatus === 'fetching';
                if (options.onStatusChange) options.onStatusChange(newStatus, data, instance);
            }
        });
    });

    onUnmounted(() => {
        if (pollingInstance) {
            pollingInstance.destroy();
        }
    });

    return {
        data: readonly(data),
        error: readonly(error),
        isFetching: readonly(isFetching),
        status: readonly(status),
        start: () => pollingInstance?.start(),
        stop: () => pollingInstance?.stop(),
        refetch: () => pollingInstance?.fetch(true)
    };
}
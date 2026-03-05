const { createApp, ref, computed, watch, defineComponent } = Vue;

// Pod-komponenta za sekciju 3
const CustomButton = {
    props: ['title'],
    emits: ['custom-click'],
    template: `<button @click="$emit('custom-click')">{{ title }}</button>`
};

// Pod-komponenta za sekciju 4
const SlotLayout = {
    template: `
        <div style="border: 1px solid #444; padding: 10px; border-radius: 8px;">
            <div style="font-weight: bold; color: var(--accent-primary); border-bottom: 1px solid #333; margin-bottom: 5px;">
                <slot name="header"></slot>
            </div>
            <slot></slot>
        </div>
    `
};

const TabA = { template: '<div>Prikazujem Sadržaj A</div>' };
const TabB = { template: '<div>Prikazujem Sadržaj B</div>' };

createApp({
    components: { CustomButton, SlotLayout, TabA, TabB },
    setup() {
        // Reaktivni podaci
        const message = ref('Pozdrav iz 2026!');
        const count = ref(0);
        const watchLogs = ref('Promatram promjene...');
        const showToggle = ref(true);
        const activeTab = ref('TabA');

        // Computed
        const doubleCount = computed(() => count.value * 2);

        // Watcher
        watch(count, (newVal) => {
            watchLogs.value = `Broj se promijenio na: ${newVal}`;
        });

        // Metode
        const alertClick = () => alert('Događaj uspješno emitiran iz komponente!');

        // Linkovi za sidebar
        const navLinks = [
            { id: 'basics', text: 'Instanca i Sintaksa' },
            { id: 'computed', text: 'Computed & Watchers' },
            { id: 'components', text: 'Komponente' },
            { id: 'slots', text: 'Slotovi i Dinamika' },
            { id: 'scaling', text: 'Skaliranje & Store' },
            { id: 'animations', text: 'Animacije' },
            { id: 'security', text: 'Security' }
        ];

        return {
            message, count, doubleCount, watchLogs,
            showToggle, activeTab, navLinks, alertClick
        }
    }
}).mount('#app');
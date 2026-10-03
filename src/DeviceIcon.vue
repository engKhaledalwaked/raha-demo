<script setup>
defineProps({ name: { type: String, required: true } })

// أيقونات خطية مرسومة يدوياً (24×24) — تأخذ اللون من currentColor
const icons = {
  blender: '<path d="M7 3h10l-1.6 10H8.6z"/><path d="M16.7 5h1.8v5h-2.6"/><path d="M10 9.5l4-1"/><rect x="5.5" y="13" width="13" height="8" rx="1.5"/><circle cx="12" cy="17" r="1.6"/>',
  fryer: '<rect x="4.5" y="3" width="15" height="18" rx="3"/><path d="M9 6.5h6"/><rect x="7" y="10" width="10" height="8" rx="1.5"/><path d="M10 14h4"/>',
  iron: '<path d="M3 18c0-4.5 3.5-8 8-8h9v8z"/><path d="M10 10V7a1 1 0 0 1 1-1h9v4"/><path d="M7 21h.01M11 21h.01M15 21h.01M19 21h.01"/>',
  micro: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><rect x="5" y="8" width="10" height="8" rx="1"/><path d="M18 8.5h.01M18 11.5h.01M17 15h2"/>',
  vacuum: '<path d="M3 18a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5"/><path d="M2.5 18h13"/><circle cx="5.5" cy="20" r="1.5"/><circle cx="12.5" cy="20" r="1.5"/><path d="M11 13c1-4 3-8 7-9l2 16"/><path d="M18 20.5h4"/>',
  pressure: '<path d="M4 11h16v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"/><path d="M3 11h18"/><path d="M5 11c0-2.5 3-4 7-4s7 1.5 7 4"/><path d="M12 7V4.5M10.5 4.5h3"/><path d="M19 9l3.5-1.5"/><path d="M2 14h2M20 14h2"/>',
  coffee: '<path d="M4 21V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><path d="M4 8h16"/><path d="M10 8v2h4V8"/><path d="M9 13.5h6V17a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"/><path d="M15 14.5h1a1.2 1.2 0 0 1 0 2.4h-1"/><path d="M7 5.5h.01M13 5.5h4"/>',
  thermos: '<path d="M8 7h8v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"/><path d="M9 7V5h6v2"/><path d="M10.5 5V3h3v2"/><path d="M9 5.5H6.5"/><path d="M16 9h1.5a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5H16"/><path d="M8 11h8"/>',
}
</script>

<template>
  <svg class="dev-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="icons[name]"></svg>
</template>

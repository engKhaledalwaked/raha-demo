import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'

const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const io = !reduce && typeof IntersectionObserver !== 'undefined'
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  : null

createApp(App)
  .directive('reveal', {
    mounted(el) {
      el.classList.add('reveal')
      io ? io.observe(el) : el.classList.add('in')
    },
  })
  .mount('#app')

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { t, tr, lang, toggleLang, img, site, wa, devices, symptomsFor, symptoms, parts, reviews } from './data'

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// التشخيص
const f = reactive({ dev: 'blender', sym: 'dead', brand: '', note: '', name: '', phone: '' })
const syms = computed(() => symptomsFor(f.dev))
watch(() => f.dev, () => { if (!syms.value.find((s) => s.id === f.sym)) f.sym = syms.value[0].id })
const dev = computed(() => devices.find((d) => d.id === f.dev))
const sym = computed(() => symptoms.find((s) => s.id === f.sym))
const ticketNo = computed(() => `${dev.value.code}-${String(devices.indexOf(dev.value) * 7 + syms.value.indexOf(sym.value) + 101).padStart(4, '0')}`)
const err = ref('')
const send = () => {
  if (!f.name.trim() || !f.phone.trim()) { err.value = t.value.doctor.required; return }
  err.value = ''
  const m = t.value.doctor.msg
  const lines = [m.hello, `${m.device}: ${tr(dev.value.t)}`, `${m.issue}: ${tr(sym.value.t)}`, f.brand.trim() ? `${m.brand}: ${f.brand.trim()}` : null, f.note.trim() ? `${m.note}: ${f.note.trim()}` : null, `${m.name}: ${f.name.trim()}`, `${m.phone}: ${f.phone.trim()}`].filter(Boolean)
  window.open(wa(lines.join('\n')), '_blank', 'noopener')
}

// قطع الغيار
const q = ref('')
const qErr = ref('')
const ask = () => {
  if (!q.value.trim()) { qErr.value = t.value.parts.required; return }
  qErr.value = ''
  window.open(wa(`${t.value.parts.msg}:\n${q.value.trim()}`), '_blank', 'noopener')
}
const year = new Date().getFullYear()
</script>

<template>
  <!-- نسخة عرض: احذف هذا الشريط عند الإطلاق الرسمي -->
  <div class="demo-ribbon">{{ t.ribbon }}</div>

  <header class="nav" :class="{ scrolled }">
    <div class="container nav-in">
      <a href="#top" class="logo">
        <span class="mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 4a5 5 0 00-6.2 6.2L3 16l2.8 2.8 5.9-5.8A5 5 0 0018 7l-3 3-2.4-.6L12 7z" /></svg></span>
        <span class="wm"><small>{{ t.brandPre }}</small><b>{{ t.brand }}</b></span>
      </a>
      <nav class="links"><a href="#doctor">{{ t.nav.doctor }}</a><a href="#parts">{{ t.nav.parts }}</a><a href="#how">{{ t.nav.how }}</a><a href="#reviews">{{ t.nav.reviews }}</a><a href="#visit">{{ t.nav.visit }}</a></nav>
      <div class="acts">
        <button type="button" class="lang" @click="toggleLang">{{ lang === 'ar' ? 'EN' : 'ع' }}</button>
        <a :href="`tel:${site.phone.tel}`" class="call hide-sm" dir="ltr">{{ site.phone.label }}</a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero" id="top">
      <div class="grid-bg" aria-hidden="true"></div>
      <div class="container hero-in">
        <div class="hero-copy">
          <p class="tag mono">{{ t.hero.tag }}</p>
          <h1><span>{{ t.hero.t1 }}</span><span class="dim">{{ t.hero.t2 }}</span><span class="blue">{{ t.hero.t3 }}</span></h1>
          <p class="lead">{{ t.hero.lead }}</p>
          <div class="ctas">
            <a href="#doctor" class="btn btn-blue">{{ t.hero.cta }}</a>
            <a href="#parts" class="btn btn-line">{{ t.hero.parts }}</a>
          </div>
          <dl class="stats">
            <div><dt class="mono">{{ site.rating }}<i>★</i></dt><dd>{{ t.hero.stat1 }}</dd></div>
            <div><dt class="mono">{{ site.reviews }}</dt><dd>{{ t.hero.stat2 }}</dd></div>
          </dl>
        </div>
        <figure class="scope">
          <img :src="img('storefront.jpg')" alt="" fetchpriority="high" />
          <span class="c tl"></span><span class="c tr"></span><span class="c bl"></span><span class="c br"></span>
          <figcaption class="mono">24.7644°N · 46.6805°E</figcaption>
          <span class="scan" aria-hidden="true"></span>
        </figure>
      </div>
      <div class="ticker" aria-hidden="true"><div class="track"><span v-for="n in 2" :key="n"><b v-for="d in devices" :key="d.id + n">{{ d.code }} · {{ tr(d.t) }}</b></span></div></div>
    </section>

    <section class="section doctor" id="doctor">
      <div class="container">
        <div class="head" v-reveal><p class="kicker mono">// {{ t.doctor.kicker }}</p><h2>{{ t.doctor.title }}</h2></div>
        <div class="dr-in">
          <form class="dr-form" novalidate @submit.prevent="send">
            <fieldset><legend><span class="mono">01</span>{{ t.doctor.s1 }}</legend>
              <div class="devs">
                <button v-for="d in devices" :key="d.id" type="button" :class="{ on: f.dev === d.id }" @click="f.dev = d.id"><i class="mono">{{ d.code }}</i>{{ tr(d.t) }}</button>
              </div>
            </fieldset>
            <fieldset><legend><span class="mono">02</span>{{ t.doctor.s2 }}</legend>
              <div class="syms">
                <button v-for="s in syms" :key="s.id" type="button" :class="{ on: f.sym === s.id }" @click="f.sym = s.id">{{ tr(s.t) }}</button>
              </div>
            </fieldset>
            <fieldset><legend><span class="mono">03</span>{{ t.doctor.s3 }}</legend>
              <div class="row">
                <label><span>{{ t.doctor.brand }}</span><input v-model="f.brand" /></label>
                <label><span>{{ t.doctor.note }}</span><input v-model="f.note" /></label>
                <label><span>{{ t.doctor.name }}</span><input v-model="f.name" autocomplete="name" /></label>
                <label><span>{{ t.doctor.phone }}</span><input v-model="f.phone" type="tel" dir="ltr" autocomplete="tel" /></label>
              </div>
            </fieldset>
            <p v-if="err" class="err" role="alert">{{ err }}</p>
            <button class="btn btn-blue block" type="submit">{{ t.doctor.send }}</button>
          </form>

          <aside class="tag-card" aria-live="polite">
            <span class="hole" aria-hidden="true"></span>
            <p class="t-title">{{ t.doctor.ticket }}</p>
            <p class="t-no mono" dir="ltr">#{{ ticketNo }}</p>
            <dl>
              <div><dt>{{ t.doctor.device }}</dt><dd>{{ tr(dev.t) }}</dd></div>
              <div><dt>{{ t.doctor.issue }}</dt><dd>{{ tr(sym.t) }}</dd></div>
              <div v-if="f.brand"><dt>{{ t.doctor.brand }}</dt><dd>{{ f.brand }}</dd></div>
              <div><dt>{{ t.doctor.status }}</dt><dd class="st"><i></i>{{ t.doctor.statusVal }}</dd></div>
            </dl>
            <p class="adv">{{ t.doctor.advice }}</p>
            <p class="tip">📷 {{ t.doctor.photo }}</p>
            <div class="barcode" aria-hidden="true"></div>
          </aside>
        </div>
      </div>
    </section>

    <section class="section parts" id="parts">
      <div class="container">
        <div class="pt-head" v-reveal>
          <div><p class="kicker mono">// {{ t.parts.kicker }}</p><h2>{{ t.parts.title }}</h2><p class="lead2">{{ t.parts.lead }}</p></div>
          <form class="finder" novalidate @submit.prevent="ask">
            <input v-model="q" :placeholder="t.parts.q" :aria-label="t.parts.kicker" />
            <button class="btn btn-amber" type="submit">{{ t.parts.ask }}</button>
            <p v-if="qErr" class="err" role="alert">{{ qErr }}</p>
          </form>
        </div>
        <div class="pt-grid">
          <article v-for="(p, i) in parts" :key="p.img" class="pt" v-reveal>
            <div class="ph"><img :src="img(p.img)" alt="" loading="lazy" /><span class="mono">P-{{ String(i + 1).padStart(3, '0') }}</span></div>
            <h3>{{ tr(p.t) }}</h3>
            <p>{{ tr(p.d) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section how" id="how">
      <div class="container how-in">
        <div class="how-photo" v-reveal><img :src="img('inside.jpg')" alt="" loading="lazy" /></div>
        <div>
          <div class="head" v-reveal><p class="kicker mono">// {{ t.how.kicker }}</p><h2>{{ t.how.title }}</h2></div>
          <ol class="steps">
            <li v-for="(s, i) in t.how.steps" :key="s.t" v-reveal><span class="mono">0{{ i + 1 }}</span><div><h3>{{ s.t }}</h3><p>{{ s.d }}</p></div></li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section reviews" id="reviews">
      <div class="container">
        <div class="head" v-reveal><p class="kicker mono">// {{ t.reviews.kicker }}</p><h2>{{ t.reviews.title }}</h2></div>
        <div class="rv-grid">
          <blockquote v-for="r in reviews" :key="r.n" class="rv" dir="rtl" v-reveal><span class="stars">★★★★★</span><p>{{ r.q }}</p><footer class="mono">— {{ r.n }}</footer></blockquote>
        </div>
        <p class="note">{{ t.reviews.note }}</p>
      </div>
    </section>

    <section class="section visit" id="visit">
      <div class="container vs-in">
        <div class="vs-card" v-reveal>
          <p class="kicker mono">// {{ t.visit.kicker }}</p>
          <h2>{{ t.visit.title }}</h2>
          <p class="addr">{{ t.visit.addr }}</p>
          <dl><div v-for="h in t.visit.hours" :key="h.d"><dt>{{ h.d }}</dt><dd>{{ h.h }}</dd></div></dl>
          <p class="prayer">🕌 {{ t.visit.prayer }}</p>
          <div class="ctas">
            <a class="btn btn-blue" :href="site.maps" target="_blank" rel="noopener">{{ t.visit.dir }}</a>
            <a class="btn btn-line dark" :href="`tel:${site.phone.tel}`">{{ t.visit.call }} <span dir="ltr">{{ site.phone.label }}</span></a>
          </div>
        </div>
        <div class="map" v-reveal><iframe :src="site.mapEmbed" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container foot">
      <a href="#top" class="logo">
        <span class="mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 4a5 5 0 00-6.2 6.2L3 16l2.8 2.8 5.9-5.8A5 5 0 0018 7l-3 3-2.4-.6L12 7z" /></svg></span>
        <span class="wm"><small>{{ t.brandPre }}</small><b>{{ t.brand }}</b></span>
      </a>
      <small>{{ t.brandSub }}</small>
      <small>© {{ year }} {{ t.footer.rights }} · <em>{{ t.footer.demo }}</em></small>
    </div>
  </footer>
  <div class="sticky">
    <a :href="`tel:${site.phone.tel}`">{{ t.sticky.call }}</a>
    <a href="#doctor" class="main">{{ t.sticky.wa }}</a>
  </div>
</template>

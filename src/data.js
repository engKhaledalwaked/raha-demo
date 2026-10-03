import { ref, computed, watchEffect } from 'vue'

const saved = (() => { try { return localStorage.getItem('rh-lang') } catch { return null } })()
export const lang = ref(saved === 'en' ? 'en' : 'ar')
watchEffect(() => {
  document.documentElement.lang = lang.value
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('rh-lang', lang.value) } catch {}
})
export const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }
export const tr = (o) => (o && typeof o === 'object' ? o[lang.value] ?? o.ar : o)
export const img = (p) => `/img/${p}`

// من خرائط Google
export const site = {
  whatsapp: '966509000069',
  phone: { tel: '+966509000069', label: '050 900 0069' },
  rating: '3.9', reviews: '1,251',
  maps: 'https://www.google.com/maps/search/?api=1&query=24.7643601,46.6805027',
  mapEmbed: 'https://www.google.com/maps?q=24.7643601,46.6805027&z=17&output=embed',
}
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

// الأجهزة المذكورة في مراجعات العملاء
export const devices = [
  { id: 'blender', code: 'BL', t: { ar: 'خلاط / عصّارة', en: 'Blender / juicer' } },
  { id: 'fryer', code: 'FR', t: { ar: 'قلاية', en: 'Fryer' } },
  { id: 'iron', code: 'IR', t: { ar: 'مكواة (كبس / بخار / يدوي)', en: 'Iron (press / steam)' } },
  { id: 'micro', code: 'MW', t: { ar: 'مايكرويف', en: 'Microwave' } },
  { id: 'vacuum', code: 'VC', t: { ar: 'مكنسة', en: 'Vacuum cleaner' } },
  { id: 'pressure', code: 'PC', t: { ar: 'قدر ضغط', en: 'Pressure cooker' } },
  { id: 'coffee', code: 'CM', t: { ar: 'مكينة قهوة', en: 'Coffee machine' } },
  { id: 'thermos', code: 'TH', t: { ar: 'ترمس شاي وقهوة', en: 'Tea & coffee flask' } },
]

export const symptoms = [
  { id: 'dead', t: { ar: 'ما يشتغل نهائياً', en: 'Doesn’t turn on' }, not: ['pressure', 'thermos'] },
  { id: 'noheat', t: { ar: 'ما يسخّن', en: 'Doesn’t heat' }, only: ['fryer', 'iron', 'micro', 'coffee', 'thermos'] },
  { id: 'noise', t: { ar: 'صوت عالي أو اهتزاز', en: 'Loud noise / vibration' }, only: ['blender', 'micro', 'vacuum', 'coffee'] },
  { id: 'leak', t: { ar: 'تسريب ماء أو بخار', en: 'Water / steam leak' }, only: ['iron', 'pressure', 'coffee', 'thermos'] },
  { id: 'suction', t: { ar: 'سحب ضعيف', en: 'Weak suction' }, only: ['vacuum'] },
  { id: 'smell', t: { ar: 'ريحة احتراق', en: 'Burning smell' }, not: ['pressure', 'thermos'] },
  { id: 'broken', t: { ar: 'قطعة مكسورة أو مفقودة', en: 'Broken / missing part' } },
]
export const symptomsFor = (dev) => symptoms.filter((s) => (!s.only || s.only.includes(dev)) && (!s.not || !s.not.includes(dev)))

export const parts = [
  { img: 'parts-shelves.jpg', t: { ar: 'جرار وأكواب الخلاطات', en: 'Blender jars & cups' }, d: { ar: 'جرار وشفرات وأغطية لأشهر الموديلات.', en: 'Jars, blades and lids for popular models.' } },
  { img: 'parts-wall.jpg', t: { ar: 'حلقات وصمامات قدور الضغط', en: 'Pressure-cooker gaskets & valves' }, d: { ar: 'جلود ومنظمات وقطع أمان بمقاسات مختلفة.', en: 'Gaskets, regulators and safety parts in many sizes.' } },
  { img: 'parts-stock.jpg', t: { ar: 'قطع العصّارات والمكائن', en: 'Juicer & machine parts' }, d: { ar: 'أكواب وفلاتر وقطع غيار أصلية وبديلة.', en: 'Cups, filters, original and compatible spares.' } },
]

const dict = {
  ar: {
    ribbon: 'نسخة عرض تجريبية — مُعدّة لورشة الرحى',
    brand: 'الرحى', brandPre: 'ورشة', brandSub: 'صيانة جميع الأجهزة المنزلية وبيع قطع الغيار',
    nav: { doctor: 'شخّص جهازك', parts: 'قطع الغيار', how: 'كيف نشتغل', reviews: 'آراء', visit: 'الموقع' },
    hero: {
      tag: 'TICKET #001 — الرياض، المصيف',
      t1: 'جهازك خربان؟', t2: 'لا ترميه.', t3: 'نصلّحه.',
      lead: 'خلاطات، قلايات، مكاوي، مايكرويف، مكانس، قدور ضغط ومكائن قهوة — نحدد لك العطل والتكلفة قبل الإصلاح، وعندنا قطع الغيار في نفس المحل.',
      cta: 'شخّص جهازك الآن', parts: 'أبحث عن قطعة',
      stat1: 'تقييم على Google', stat2: 'مراجعة',
    },
    doctor: {
      kicker: 'التشخيص', title: 'وش فيه جهازك؟',
      s1: 'نوع الجهاز', s2: 'المشكلة', s3: 'تفاصيل (اختياري)',
      brand: 'الماركة / الموديل', note: 'وصف إضافي',
      name: 'الاسم', phone: 'الجوال',
      ticket: 'بطاقة الصيانة', device: 'الجهاز', issue: 'العطل', status: 'الحالة', statusVal: 'بانتظار الفحص',
      advice: 'أحضر الجهاز للورشة — نفحصه ونقول لك العطل والتكلفة قبل ما نبدأ.',
      photo: 'نصيحة: أرسل صورة الجهاز ولوحة الموديل في نفس المحادثة.',
      send: 'أرسل البطاقة عبر واتساب', required: 'الرجاء كتابة الاسم والجوال.',
      msg: { hello: 'السلام عليكم، عندي جهاز يحتاج صيانة', device: 'الجهاز', issue: 'المشكلة', brand: 'الماركة/الموديل', note: 'ملاحظات', name: 'الاسم', phone: 'الجوال' },
    },
    parts: {
      kicker: 'قطع الغيار', title: 'القطعة اللي تدوّرها… غالباً عندنا',
      lead: 'اكتب اسم القطعة وموديل الجهاز ونرد عليك بالتوفر.',
      q: 'مثال: جرة خلاط مولينكس / جلدة قدر ضغط ٨ لتر',
      ask: 'اسأل عن التوفر', required: 'اكتب اسم القطعة أولاً.',
      msg: 'السلام عليكم، أبحث عن قطعة غيار',
    },
    how: {
      kicker: 'كيف نشتغل', title: 'ثلاث خطوات',
      steps: [
        { t: 'أحضر الجهاز', d: 'أو أرسل صورته ووصف المشكلة على واتساب أولاً.' },
        { t: 'فحص وتسعير', d: 'نحدد لك العطل والتكلفة بوضوح قبل الإصلاح.' },
        { t: 'إصلاح واستلام', d: 'نصلّح بالقطعة المناسبة ونبلغك وقت الاستلام.' },
      ],
    },
    reviews: { kicker: 'آراء العملاء', title: 'من مراجعات Google', note: 'مقتطفات من مراجعات الورشة على خرائط Google (مع تصحيح إملائي بسيط).' },
    visit: {
      kicker: 'الموقع', title: 'ورشة الرحى — المصيف',
      addr: 'شارع ابن سينا، حي المصيف، الرياض 12467',
      hours: [{ d: 'السبت – الخميس', h: '٩:٠٠ ص – ١:٠٠ م  ·  ٤:٠٠ م – ١١:٠٠ م' }, { d: 'الجمعة', h: '٤:٠٠ م – ١١:٠٠ م' }],
      prayer: 'المحل يُغلق وقت الصلاة.',
      dir: 'الاتجاهات', call: 'اتصال',
    },
    footer: { rights: 'جميع الحقوق محفوظة', demo: 'نسخة عرض تجريبية' },
    sticky: { call: 'اتصال', wa: 'شخّص جهازك' },
  },
  en: {
    ribbon: 'Demo preview — prepared for Al Raha Workshop',
    brand: 'Al Raha', brandPre: 'Workshop', brandSub: 'Home appliance repair & spare parts',
    nav: { doctor: 'Diagnose', parts: 'Spare parts', how: 'How it works', reviews: 'Reviews', visit: 'Location' },
    hero: {
      tag: 'TICKET #001 — Al Masif, Riyadh',
      t1: 'Appliance broken?', t2: 'Don’t throw it.', t3: 'We fix it.',
      lead: 'Blenders, fryers, irons, microwaves, vacuums, pressure cookers and coffee machines — we tell you the fault and the cost before repairing, and the spare parts are in the same shop.',
      cta: 'Diagnose your device', parts: 'Find a part',
      stat1: 'Google rating', stat2: 'reviews',
    },
    doctor: {
      kicker: 'Diagnosis', title: 'What’s wrong with it?',
      s1: 'Device', s2: 'Problem', s3: 'Details (optional)',
      brand: 'Brand / model', note: 'More details',
      name: 'Name', phone: 'Mobile',
      ticket: 'Repair ticket', device: 'Device', issue: 'Issue', status: 'Status', statusVal: 'Awaiting inspection',
      advice: 'Bring it to the workshop — we inspect it and tell you the fault and cost before we start.',
      photo: 'Tip: send a photo of the device and its model label in the same chat.',
      send: 'Send ticket on WhatsApp', required: 'Please enter your name and mobile.',
      msg: { hello: 'Hello, I have an appliance that needs repair', device: 'Device', issue: 'Problem', brand: 'Brand/model', note: 'Notes', name: 'Name', phone: 'Mobile' },
    },
    parts: {
      kicker: 'Spare parts', title: 'The part you’re looking for… we probably have it',
      lead: 'Type the part and the device model and we’ll reply with availability.',
      q: 'e.g. Moulinex blender jar / 8L pressure cooker gasket',
      ask: 'Check availability', required: 'Type the part name first.',
      msg: 'Hello, I’m looking for a spare part',
    },
    how: {
      kicker: 'How it works', title: 'Three steps',
      steps: [
        { t: 'Bring it in', d: 'Or send a photo and the problem on WhatsApp first.' },
        { t: 'Inspect & quote', d: 'We tell you the fault and the cost clearly before repairing.' },
        { t: 'Fix & pick up', d: 'We repair it with the right part and tell you when it’s ready.' },
      ],
    },
    reviews: { kicker: 'Reviews', title: 'From Google reviews', note: 'Excerpts from the workshop’s Google Maps reviews (original Arabic).' },
    visit: {
      kicker: 'Location', title: 'Al Raha — Al Masif',
      addr: 'Ibn Sina St., Al Masif, Riyadh 12467',
      hours: [{ d: 'Saturday – Thursday', h: '9:00 AM – 1:00 PM · 4:00 – 11:00 PM' }, { d: 'Friday', h: '4:00 – 11:00 PM' }],
      prayer: 'The shop closes during prayer times.',
      dir: 'Directions', call: 'Call',
    },
    footer: { rights: 'All rights reserved', demo: 'Demo preview' },
    sticky: { call: 'Call', wa: 'Diagnose' },
  },
}
export const t = computed(() => dict[lang.value])

export const reviews = [
  { n: 'SAEED A. ALAMRI', q: 'مركز يعطي كل ما تحتاجه لتصليح وتوفير جميع القطع الكهربائية… ورشة الرحى طاقم احترافي بحت يعطيك الخلل وينه والتكلفة المعقولة وسرعة الإصلاح.' },
  { n: 'Mohammed Ragab', q: 'ورشة ممتازة جداً: إصلاح قلايات وكاوية كبس وبخار ويدوي ومايكرويف ومكنسة وخلاطات وعصارة، وبيع قطع غيار الأجهزة المنزلية وأدوات المطبخ.' },
]

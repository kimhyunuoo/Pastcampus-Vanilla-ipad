import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// basket Onclick
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event) {
  event.stopPropagation()
  if (basketEl.classList.contains("show")) {
    hideBasket()
  } else {
    showBasket()
  }
})
basketEl.addEventListener("click", function(event) {
  event.stopPropagation()
})
window.addEventListener("click", function() {
  hideBasket()
})
// 함수는 간단하게 보여지는 이름으로 해서 나타내는 추상화로 사용하는 것도 하나의 방법
function showBasket() {
  basketEl.classList.add("show")
}
function hideBasket() {
  basketEl.classList.remove("show")
}

// Search Section
const headerEl = document.querySelector("header")
//전개 연산자 사용 / 얉은 복사 ---> ... / 전개연산자로 해체 후 배열로 반환
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchshadowEl = searchWrapEl.querySelector('.shadow')
// autocompletes section
const autocompleteEls = [...searchWrapEl.querySelectorAll('li')]
//input focus
const searchInputEl = searchWrapEl.querySelector('input')

searchStarterEl.addEventListener('click', ShowSearch)
searchCloserEl.addEventListener('click', HideSearch)
searchshadowEl.addEventListener("click", HideSearch)

function ShowSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function(el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + "s"
  })
  autocompleteEls.forEach(function(el, index) {
    el.style.transitionDelay = index * .4 / autocompleteEls.length + 's'
  })
  setTimeout(function() {
    searchInputEl.focus()
  }, 600) 
}
function HideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function(el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + "s"
  })
  autocompleteEls.reverse().forEach(function(el, index) {
    el.style.transitionDelay = index * .4 / autocompleteEls.length + 's'
  })
  autocompleteEls.reverse()
  searchInputEl.value = ''
}

// 요소의 가시성 관찰 :: IntersectionObserver()
const io = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry){
    if (!entry.isIntersecting) {
      return 
    } 
    entry.target.classList.add("show")
  })
})
const infoEls = document.querySelectorAll(".info")
infoEls.forEach(function(el) {
  io.observe(el)
})

// VIDEO SECTION
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function() {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function() {
  video.pause()
  pauseBtn.classList.add('hide')
  playBtn.classList.remove('hide')
})

/*
  당신에게 맞는 iPad는? 랜더링작업 !
    상품 목록을 자바스크립트로 객체화 시킨다.
    객체 안에는 썸네일 / 색상 등을 넣을 수 있다.
    만들어 놓은 js파일을 가지고 올때에는 최상단에 넣어서 작업한다.
*/
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function(ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function(color) {
    colorList += `<li style='background-color: ${color};'></li>`
  })

  
  itemEl.innerHTML = /* html */`
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

const navigationEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map) {
    mapList += /* HTML */`<li>
    <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* HTML */`
    <h3>
      <span class='text'>${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationEl.append(mapEl)
})

// 년도 자동 숫자 생성
const thisYearEl = document.querySelector("span.this-year")
thisYearEl.textContent = new Date().getFullYear()
(function flexible(window, document) {
  // 需要限制的最小宽度
  const defaultMinWidth = 320
  // 需要限制的最大宽度
  const defaultMaxWidth = 540
  const docEl = document.documentElement
  const metaElem = document.querySelector('meta[name="viewport"]')
  const dpr = window.devicePixelRatio || 1

  // 计算的基准值
  let calcMaxWidth = 9999999

  // adjust body font size
  function setBodyFontSize() {
    if (document.body)
      document.body.style.fontSize = `${12 * dpr}px`

    else
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
  }
  setBodyFontSize()
  if (metaElem?.getAttribute('data-content-max') !== null)
    calcMaxWidth = defaultMaxWidth

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    let clientWidth = docEl.clientWidth

    clientWidth = Math.max(clientWidth, defaultMinWidth)

    // 调整计算基准值
    if (calcMaxWidth === defaultMaxWidth)
      clientWidth = Math.min(clientWidth, defaultMaxWidth)

    const rem = clientWidth / 10

    docEl.style.fontSize = `${rem}px`
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted)
      setRemUnit()
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    const fakeBody = document.createElement('body')
    const testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1)
      docEl.classList.add('hairlines')

    docEl.removeChild(fakeBody)
  }
}(window, document))

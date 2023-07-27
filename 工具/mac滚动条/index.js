window.addEventListener('scroll', function (ev) {
  document.body.toggleAttribute('scroll', true)
  this.timer && clearTimeout(this.timer)
  this.timer = setTimeout(() => {
    document.body.toggleAttribute('scroll')
  }, 500)
})

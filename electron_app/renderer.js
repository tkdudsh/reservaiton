const btn = document.getElementById('btn')
const input = document.getElementById('name')
const result = document.getElementById('result')

btn.addEventListener('click', () => {
  result.textContent = `${input} 확인`
})
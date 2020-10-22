const select1 = document.getElementById('select1')
const select2 = document.getElementById('select2')
const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')

const getCurrancyValues = async () => {
  const r = await fetch('https://economia.awesomeapi.com.br/json/all')
  const t = await r.text()
  return JSON.parse(t)
}

const calcDiff = (currencys, target) => {
  dicCurrency = {
    '0': '0',
    '1': '1',
    '2': '4',
    '3': '2',
    '4': '3'
  }
  
  if(target){
    if(target.id == 'input1'){
      console.log()
      return (((parseFloat(currencys[dicCurrency[select1.selectedIndex]].bid) * target.value) * parseFloat(currencys[dicCurrency[select2.selectedIndex]].bid)) / parseFloat(currencys[dicCurrency[select1.selectedIndex]].bid))
      .toFixed(2)
    }else{
      return (parseFloat(currencys[dicCurrency[select2.selectedIndex]].bid) / (parseFloat(currencys[dicCurrency[select1.selectedIndex]].bid) * target.value))
      .toFixed(2)
    }    
  }else{
    return ((parseFloat(currencys[dicCurrency[select1.selectedIndex]].bid) * input1.value) * parseFloat(currencys[dicCurrency[select2.selectedIndex]].bid)).toFixed(2)
  }
  
}

window.addEventListener('DOMContentLoaded', async () => {
  const currencyToUse = ['USD', 'USDT', 'BTC', 'EUR']
  const allCurrencys = await getCurrancyValues()
  const currencys = Object.entries(allCurrencys)
  .filter(e => currencyToUse.includes(e[0]))
  .map(e => {
    const {bid, code, name} = e[1]
    const roundedBid = parseFloat(bid).toFixed(2)
    return {bid: roundedBid, code, name}
  })
  currencys[4] = {bid: '1', code: 'BRL', name: 'Real brasileiro'}
  currencys[1].code = 'USDT'

  select1.selectedIndex = 2
  select2.selectedIndex = 0
  input1.value = '1'
  input2.value = calcDiff(currencys)

  for(input of document.getElementsByTagName('input')){
    input.addEventListener('keyup', (e) => {
      const res = calcDiff(currencys, e.target)
      if(e.target.id == 'input1'){
        input2.value = res
      }else{
        input1.value = res
      }
    })
  }
})
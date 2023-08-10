'use strict';

const btn = document.querySelector('#button');
const contentNode = document.querySelector('.answer');

function useRequest(input_1, input_2) {
    
  return fetch(`https://picsum.photos/${input_1}/${input_2}`)
         .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(() => {
            console.log('error')
            contentNode.innerHTML = '<p> Ошибка, повторите ввод</p>'
        })
}

btn.addEventListener('click', async () => {
    const inputWidth = document.querySelector('#input1').value;
    const inputHeight = document.querySelector('#input2').value;
    let minSize = 100,
        maxSize = 300;
    if ((inputWidth >= minSize && inputWidth <= maxSize) && (inputHeight >= minSize && inputHeight <= maxSize)){
        const url = await useRequest(inputWidth, inputHeight)
        contentNode.innerHTML = `
      <img src='${url}' alt='image'>`
    } else {
        contentNode.innerHTML = `
      <p>Число вне диапазона, повторите ввод ${minSize} до ${maxSize}</p>`
    }
});

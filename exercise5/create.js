const url_template = (p, l) => `https://picsum.photos/v2/list?page=${p}&limit=${l}`
const result_node = document.querySelector('.answer');



const btn_node = document.querySelector('.request');
const page_node = document.querySelector('.input-page');
const limit_node = document.querySelector('.input-limit');

let page_param = localStorage.getItem('Page_param');
let limit_param = localStorage.getItem('Limit_param');

if(page_param != null && limit_param != null)
{
    console.log("Use Page and Limit from local storage: ", page_param, limit_param) 
    page_node.value = Number(page_param)
    limit_node.value = Number(limit_param)
    runRequest(Number(page_param), Number(limit_param))
}

function useRequest(p,l) {
    return fetch(url_template(p, l))
    .then((response) => {
       return response.json()
    })
    .then((json) => {
      localStorage.setItem('Page_param', p);
      localStorage.setItem('Limit_param', l);
      displayResult(json)

    })
    .catch(() => { console.log('fetch error') });
};

function displayResult(data) {

  let cards = '';

  data.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img
            src="${item.download_url}"
            class="card-image"
            />
            <p>${item.author}</p>
        </div>
        `;
        cards = cards + cardBlock;
    });

    result_node.innerHTML = cards;
};

function runRequest(page, limit){
    if((page < 1 || page > 10) && (limit < 1 || limit > 10))
    {
        result_node.innerHTML = `
      <p>Номер страницы вне диапазона от 1 до 10 </p>`
    }  else if(page < 1 || page > 10)
    {
        result_node.innerHTML = `
      <p>Номер страницы вне диапазона от 1 до 10 </p>`
    }  else if(limit < 1 || limit > 10)
    {
      {
        result_node.innerHTML = `
      <p>Лимит вне диапазона от 1 до 10 </p>`
    } 
    } else{
      let res = useRequest(page, limit);
    }
}

btn_node.addEventListener('click', () => {
    p = Number(page_node.value);
    l = Number(limit_node.value);
          
    runRequest(p, l)
  });


const button = document.querySelector('button');

button.addEventListener('click', () =>{
	let value = document.querySelector('input').value;
	if ((Number(value) <= 10) && (Number(value) >= 1)){
		document.querySelector('.output').textContent  = ""
		fetch(`https://picsum.photos/v2/list?limit=${value}`)
            .then(response => response.json())
            .then(json => {
                for (let i= 0; i < json.length; i+=1){
                    // создаем блок с картинкой и подписью
                    let block = document.createElement('div');
                    block.className = "block";
                    
                    // создаем картинку, вставляем в блок
                    let image = document.createElement('img');
                    image.src = json[i]['download_url'];
                    image.alt = json[i]['author'];
                    image.width = 300;
                    block.append(image);
                    
                    // создаем подпись
                    let caption = document.createElement('div');
                    caption.className = "caption";
                    caption.textContent = json[i]['author']
                    block.append(caption)
                    
                    // вставляем блок в сайт
                    document.getElementsByClassName('output')[0].append(block);                  
                }
            });
	}
	else {
        document.querySelector('.output').textContent  = "число вне диапазона от 1 до 10"
    }
});

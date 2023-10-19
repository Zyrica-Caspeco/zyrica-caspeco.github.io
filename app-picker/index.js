const css = css => css;

let count = 0;
const wait = () => {
    let container = document.querySelector('.framework_menu_container') || document.querySelector('.menu-container');
    if (container) {
        init();
    } else {
        if (count++ < 100) setTimeout(wait, 100);
    }
};


let texts = {
    header: 'Cloud',
    description: 'Making dreams come true',
    abreviation: 'CL',
    url: 'https://admin-checkout.dev.caspeco.net',
};
const init = () => {
    console.log('App Picker');
    document.querySelector('#app-picker')?.remove();
    const isCloud = document.querySelector('.framework_menu_container');

    if (!isCloud) {
        texts = {
            header: 'Checkout',
            description: 'True dreams in making',
            abreviation: 'CO',
            url: 'https://cloud.caspeco.se',
        }
    }

    let container = document.querySelector('.framework_menu_container') || document.querySelector('.menu-container');

    if (container) {
        const button = createButton();
        container.insertBefore(button, container.firstChild);
    }
}

function createButton() {
    const button = document.createElement('a');
    button.id = 'app-picker';
    button.style = css`
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        text-decoration: none;
        cursor: pointer;
    `;
    button.addEventListener('click', () => {
        document.location = texts.url;
    });

    const circle = document.createElement('div');
    circle.style = css`
      width: 40px;
      height: 40px;
      background-color: blue;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    `;

    const circleText = document.createElement('div');
    circleText.innerText = texts.abreviation;
    circleText.style = css`
      color: white;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
    `;
    circle.appendChild(circleText);

    button.appendChild(circle);

    const content = document.createElement('div');
    content.style = css`
        flex: 1;
    `;

    const header = document.createElement('div');
    header.innerText = texts.header;
    header.style = css`
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
    `;
    content.appendChild(header);

    const description = document.createElement('div');
    description.innerText = texts.description;
    description.style = css`
        font-size: 12px;
        line-height: 12px;
    `;
    content.appendChild(description);

    button.appendChild(content);
/*
    const icon = document.createElement('div');
    icon.style = css`
        display: flex;
        width: 24px;
        height: 24px;
        flex-wrap: wrap;
    `;

    for (let i = 0; i < 9; i++) {
        const dot = document.createElement('div');
        dot.style = css`
            width: 6px;
            height: 6px;
            margin: 1px;
            border-radius: 2px;
            background-color: gray;
            display: block;
        `;
        icon.appendChild(dot);
    }

    button.appendChild(icon);
*/
    return button;
}

wait();

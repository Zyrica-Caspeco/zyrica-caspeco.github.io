(()=> {
    /* Inject bookmark

        javascript:
        (() => {
            const ele = document.createElement('script');
            ele.src = 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.js';
            document.head.appendChild(ele);

            ele.addEventListener('load', () => {
                const src = 'https://raw.githubusercontent.com/Zyrica-Caspeco/tools/master/colorPicker.js';
                axios.get(src).then(({data}) => {
                    const script = document.createElement('script');
                    script.innerHTML = data;
                    document.head.appendChild(script);
                });
            });
        })();

    // */

    function init() {
        createWidget();
    }

    const themes = {
        'Default': {
            '--theme-colors-primary-wlv': '#4530C9',
            '--theme-colors-primary-hover-wlv': '#3726A1',
            '--theme-colors-primary-active-wlv': '#291D79',
            '--theme-colors-on-primary-wlv': '#FFFFFF',
            '--theme-colors-primary-container-wlv': '#ECEAFA',
            '--theme-colors-on-primary-container-wlv': '#0C0656',
            '--theme-colors-secondary-wlv': '#25AF72',
            '--theme-colors-secondaryHover-wlv': '#1E8C5B',
            '--theme-colors-secondaryActive-wlv': '#166944',
            '--theme-colors-on-secondary-wlv': '#FFFFFF',
            '--theme-colors-secondary-container-wlv': '#E5F5EE',
            '--theme-colors-on-secondary-container-wlv': '#0F462E',
            '--theme-colors-accent-wlv': '#0269FF',
            '--theme-colors-accent-hover-wlv': '#0254CC',
            '--theme-colors-accent-hover-alpha-wlv': '#0269FF1F',
            '--theme-colors-accent-active-wlv': '#013F99',
            '--theme-colors-accent-active-alpha-wlv': '#0269FF29',
            '--theme-colors-on-accent-wlv': '#FFFFFF',
            '--theme-colors-accent-container-wlv': '#E6F0FF',
            '--theme-colors-on-accent-container-wlv': '#012A66',
            '--theme-colors-background-wlv': '#FFFFFF',
            '--theme-colors-on-background-wlv': '#0C0656',
            '--theme-colors-on-background-border-wlv': '#0C06563D',
            '--theme-colors-on-background-subdued-wlv': '#0C06567A',
            '--theme-colors-background-disabled-wlv': '#0C06560F',
            '--theme-colors-on-background-header-wlv': '#0C0656',
            '--theme-colors-surface-wlv': '#FFFFFF',
            '--theme-colors-on-surface-wlv': '#0C0656',
            '--theme-colors-on-surface-border-wlv': '#0C06563D',
            '--theme-colors-on-surface-subdued-wlv': '#0C06567A',
            '--theme-colors-surface-disabled-wlv': '#0C06560F',
            '--theme-colors-on-surface-header-wlv': '#0C0656',
            '--theme-colors-info-wlv': '#0269FF',
            '--theme-colors-info-hover-wlv': '#0254CC',
            '--theme-colors-info-active-wlv': '#013F99',
            '--theme-colors-on-info-wlv': '#FFFFFF',
            '--theme-colors-info-container-wlv': '#E6F0FF',
            '--theme-colors-on-info-container-wlv': '#012A66',
            '--theme-colors-success-wlv': '#25AF72',
            '--theme-colors-success-hover-wlv': '#1E8C5B',
            '--theme-colors-success-active-wlv': '#166944',
            '--theme-colors-on-success-wlv': '#FFFFFF',
            '--theme-colors-success-container-wlv': '#E5F5EE',
            '--theme-colors-on-success-container-wlv': '#0F462E',
            '--theme-colors-warning-wlv': '#EEB765',
            '--theme-colors-warning-hover-wlv': '#BE9251',
            '--theme-colors-warning-active-wlv': '#8F6E3D',
            '--theme-colors-on-warning-wlv': '#FFFFFF',
            '--theme-colors-warning-container-wlv': '#FDF6ED',
            '--theme-colors-on-warning-container-wlv': '#5F4928',
            '--theme-colors-error-wlv': '#EE657A',
            '--theme-colors-error-hover-wlv': '#BE5162',
            '--theme-colors-error-active-wlv': '#8F3D49',
            '--theme-colors-on-error-wlv': '#FFFFFF',
            '--theme-colors-error-container-wlv': '#FDF0F2',
            '--theme-colors-on-error-container-wlv': '#5F2831',
            '--theme-colors-neutral-wlv': '#000000',
            '--theme-colors-neutral-hover-wlv': '#2E2E2E',
            '--theme-colors-neutral-active-wlv': '#454545',
            '--theme-colors-on-neutral-wlv': '#FFFFFF',
            '--theme-colors-neutral-container-wlv': '#F1F1F1',
            '--theme-colors-on-neutral-container-wlv': '#000000',
        },
        'Rainbow': {
            '--theme-colors-primary-wlv': '#008000',
            '--theme-colors-primary-hover-wlv': '#006600',
            '--theme-colors-primary-active-wlv': '#004D00',
            '--theme-colors-on-primary-wlv': '#1AFF1A',
            '--theme-colors-primary-container-wlv': '#EBFFEB',
            '--theme-colors-on-primary-container-wlv': '#00BD00',

            '--theme-colors-secondary-wlv': '#0000FF',
            '--theme-colors-secondary-hover-wlv': '#0000CC',
            '--theme-colors-secondary-active-wlv': '#000099',
            '--theme-colors-on-secondary-wlv': '#00FFFF',
            '--theme-colors-secondary-container-wlv': '#E5F3FF',
            '--theme-colors-on-secondary-container-wlv': '#1F8FFF',

            '--theme-colors-accent-wlv': '#802AA8',
            '--theme-colors-accent-hover-wlv': '#60207E',
            '--theme-colors-accent-hover-alpha-wlv': '#802AA81F',
            '--theme-colors-accent-active-wlv': '#411556',
            '--theme-colors-accent-active-alpha-wlv': '#802AA829',
            '--theme-colors-on-accent-wlv': '#FF00FF',
            '--theme-colors-accent-container-wlv': '#FF00FF',
            '--theme-colors-on-accent-container-wlv': '#DD69DD',

            '--theme-colors-background-wlv': '#FFEBEB',
            '--theme-colors-on-background-wlv': '#FF0000',
            '--theme-colors-on-background-border-wlv': '#FF00003D',
            '--theme-colors-on-background-subdued-wlv': '#FF00007A',
            '--theme-colors-background-disabled-wlv': '#FF00000F',
            '--theme-colors-on-background-header-wlv': '#990000',

            '--theme-colors-surface-wlv': '#FFF8EB',
            '--theme-colors-on-surface-wlv': '#FFA500',
            '--theme-colors-on-surface-border-wlv': '#FFA5003D',
            '--theme-colors-on-surface-subdued-wlv': '#FFA5007A',
            '--theme-colors-surface-disabled-wlv': '#FFA5000F',
            '--theme-colors-on-surface-header-wlv': '#C27D00',
        },
    };

    function createThemePicker() {
        const ele = document.createElement('div');
        ele.style = 'margin-bottom: 10px;';
        Object.keys(themes).forEach(themeName => {
            const button = document.createElement('button');
            button.style = `all: revert;margin-right:10px;`;
            button.innerHTML = themeName;
            button.addEventListener('click', () => {
                setTheme(themeName);
            });
            ele.appendChild(button);
        });
        return ele;
    }
    function createWidget() {
        let css = s => s;

        document.querySelector('colorpicker')?.remove();

        const ele = document.createElement('colorpicker');
        ele.style = css`
          position: absolute;
          top: 100px;
          left: 100px;
          max-height: 50%;
          overflow: auto;
    
          z-index: 99999999999;
          padding: 20px;
          color: white;
          background: rgba(0, 0, 0, 0.8);
        `;
        makeDraggable(ele);

        ele.appendChild(createThemePicker());

        getThemeVariableNames().map(colorSelection).forEach(color => {
            ele.appendChild(color);
        });
        document.body.appendChild(ele);
    }


    function setTheme(themeName) {
        const theme = themes[themeName];
        Object.keys(theme).forEach((name) => {
            setColor(name, theme[name]);
        });
        createWidget();
    }
    function logCurrentTheme() {
        const names = Object.keys(themes['rainbow']);
        console.log('logCurrentTheme', names.map(getColor));

    }

    function getReadableName(name) {
        return name.replace('--theme-', '').replace('colors-', '').replace('-wlv', '').replaceAll('-', ' ');
    }
    function getThemeVariableNames() {
        return Object.values([...document.styleSheets]
            .reduce((acc, css) => [...acc, ...css.rules], [])
            .find(css => css.selectorText === ':host, :root, [data-theme]').style)
            .filter(name => name.match(/^--theme(.*)-wlv$/));
    }

    function makeDraggable(ele) {
        function draggable(e) {
            e.preventDefault();

            let x = e.clientX,
                y = e.clientY;

            const target = e.target;

            const move = e => {
                let dx = e.clientX - x,
                    dy = e.clientY - y;
                target.style.left = (target.offsetLeft + dx) + 'px';
                target.style.top = (target.offsetTop + dy) + 'px';
                x = e.clientX;
                y = e.clientY;
            };
            window.addEventListener('mousemove', move);

            window.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', move);
            });
        }
        ele.addEventListener('mousedown', draggable);
    }


    function getColor(name) {
        const root = document.querySelector(':root');
        console.log('getColor', name, getComputedStyle(root).getPropertyValue(name));
        return getComputedStyle(root).getPropertyValue(name);
    }
    function setColor(name, color) {
        const root = document.querySelector(':root');
        root.style.setProperty(name, color);
    }


    function colorSelection(name) {
        const ele = document.createElement('label');
        ele.style = `
                  display: flex;
                  align-items: center;
              `;


        const label = document.createElement('span');
        label.style = `margin-left: 10px;`;
        label.innerHTML = getReadableName(name);

        const input = document.createElement('input');
        input.type = 'color';
        input.value = getColor(name);
        input.addEventListener('input', () => {
            setColor(name, input.value);
        });

        ele.appendChild(input);
        ele.appendChild(label);

        return ele;
    }

    init();
})();
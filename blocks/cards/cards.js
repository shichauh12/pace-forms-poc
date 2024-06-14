import { createOptimizedPicture, getConfig } from '../../scripts/aem.js';

console.log("This is card");
/*fetch('../../config.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json.dev);
    });*/

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
  getConfig().then(response => {
   console.log(response.dev);
  })
}

async function fetchAndParseYAML(url) {
    try {
        // Fetch the YAML file
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Read the response as text
        const yamlText = await response.text();
        
        // Parse the YAML text
        const data = jsyaml.load(yamlText);
        
        // Log the parsed data
        console.log(data.value + " --- yaml" );
        
        // Do something with the data
        // For example, display it on the page
        //document.body.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        console.error('Failed to fetch and parse YAML file:', error);
    }
}

fetchAndParseYAML('../.config.yaml');
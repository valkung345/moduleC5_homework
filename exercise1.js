const xml = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

function parseXML(xml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  
  const students = Array.from(xmlDoc.getElementsByTagName('student')).map(student => {
    const nameElem = student.getElementsByTagName('name')[0];
    const lang = nameElem.getAttribute('lang');
    const firstName = nameElem.getElementsByTagName('first')[0].textContent;
    const lastName = nameElem.getElementsByTagName('second')[0].textContent;
    const age = parseInt(student.getElementsByTagName('age')[0].textContent);
    const prof = student.getElementsByTagName('prof')[0].textContent;
    
    return { name: `${firstName} ${lastName}`, age, prof, lang };
  });
  
  return { list: students };
}

const jsObject = parseXML(xml);
console.log(jsObject);

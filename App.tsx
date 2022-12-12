import * as React from 'react';
import htmldiff from './htmls';
import './style.css';

export default function App() {
  const [item, setItem] = React.useState(<h1>check</h1>);
  const [newItem, setNewItem] = React.useState(<h1>check</h1>);
  const org = `<ul> <li>Hello Batman, decidee what to do: <a href='#'>asdasd</a></li> <li>Hello Batman, decidee what to do: <a href='#'>asdasd</a></li></ul>
`;
  const changed = `<ul> <li>Hello <u>B</u>atman, <b>decidee</b> <a href="23454">what</a> to do: <a href='#'>asdasd</a> </li> <li>Hello Batman, sa what to do: <a href='#'>asdasd</a></li></ul>`;
  var el: any = document.createElement('div');
  el.innerHTML = htmldiff(org, changed);
  var elorg: any = document.createElement('div');
  elorg.innerHTML = org;
  var elChanged: any = document.createElement('div');
  elChanged.innerHTML = changed;
  const bTag = el.getElementsByTagName('b');
  const bTagOrg = elorg.getElementsByTagName('b');
  const uTag = el.getElementsByTagName('u');
  const uTagOrg = elorg.getElementsByTagName('u');
  const iTag = el.getElementsByTagName('i');
  const iTagOrg = elorg.getElementsByTagName('i');

  function checker(mod: any, old: any) {
    if (mod.length !== 0 && old.length !== 0) {
      [...mod].forEach((mods) => {
        [...old].forEach((olds) => {
          if (!mods.isEqualNode(olds)) {
            // console.log(mods.textContent.length);
            const newSpan = document.createElement('del');
            newSpan.textContent = mods.textContent;
            mods.innerHTML = `<ins>${mods.textContent}</ins>`;
            mods.insertAdjacentElement('beforebegin', newSpan);
            setNewItem(el.innerHTML);
            return el.innerHTML;
          }
        });
      });
    } else if (mod.length !== 0) {
      [...mod].forEach((item) => {
        const newSpan = document.createElement('del');
        newSpan.textContent = item.textContent;
        item.innerHTML = `<ins>${item.textContent}</ins>`;
        item.insertAdjacentElement('beforebegin', newSpan);
        setNewItem(el.innerHTML);
        return el.innerHTML;
      });
    }
    // else {
    //   setNewItem(htmldiff(org, changed));
    // }
  }
  function checkAtrributeChange(element: any, org: any) {
    const aTag = element.getElementsByTagName('a');
    const aOrg = org.getElementsByTagName('a');
    [...aTag].forEach((moded) => {
      [...aOrg].forEach((orgi) => {
        console.log(moded.isEqualNode(orgi));
        if (!moded.isEqualNode(orgi)) {
          const deepCopy = moded.cloneNode(true);
          const del = deepCopy.getElementsByTagName('del');
          const ins = deepCopy.getElementsByTagName('ins');
          let delString = '';
          let insString = '';
          for (const dels of del) {
            delString = delString + dels.textContent;
            dels.remove();
          }
          for (const inserted of ins) {
            insString = insString + inserted.textContent;
            inserted.remove();
          }
          const newNode = `<del>${deepCopy.innerHTML + delString}</del> <ins>${
            deepCopy.innerHTML + insString
          }</ins>`;
          moded.innerHTML = newNode;
        }
      });
    });
    // for (const ch of aTag) {
    //   // console.log(ch)
    //   if (ch.previousElementSibling?.tagName === 'A') {
    //     ch.previousElementSibling.innerHTML = `<del>${ch.textContent}</del>`;
    //     ch.innerHTML = `<ins>${ch.textContent}</ins>`;
    //   }
    // }
    setNewItem(element.innerHTML);
  }

  function remover(tag: any, ele: any) {
    const tagger = ele.getElementsByTagName(tag);
    for (const ch of tagger) {
      if (ch.previousElementSibling?.tagName === 'DEL') {
        ch.remove();
      }
    }
    setNewItem(ele.innerHTML);
  }
  React.useEffect(() => {
    const data = htmldiff(org, changed);
    setItem(data);
    checker(bTag, bTagOrg);
    checker(uTag, uTagOrg);
    checker(iTag, iTagOrg);
    remover('del', el);
    checkAtrributeChange(el, elorg);
  }, [bTag, bTagOrg]);
  const mainContent = document.getElementById('main');
  console.log(mainContent);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      {/* <div dangerouslySetInnerHTML={{ __html: item }} /> */}
      <div id="main" dangerouslySetInnerHTML={{ __html: newItem }} />
    </div>
  );
}

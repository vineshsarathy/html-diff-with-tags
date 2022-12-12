import * as React from 'react';
import htmldiff from './htmls';
import './style.css';

export default function HtmlDiff({ initial, modified }) {
  const [html, setHtml] = React.useState('<h1>Loading</h1>');
  let el: any = document.createElement('div');
  el.innerHTML = htmldiff(initial, modified);
  let elorg: any = document.createElement('div');
  elorg.innerHTML = initial;
  let elChanged: any = document.createElement('div');
  elChanged.innerHTML = modified;
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
            const newSpan = document.createElement('del');
            newSpan.textContent = mods.textContent;
            mods.innerHTML = `<ins>${mods.textContent}</ins>`;
            mods.insertAdjacentElement('beforebegin', newSpan);
            setHtml(el.innerHTML);
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
        setHtml(el.innerHTML);
        return el.innerHTML;
      });
    }
  }
  function checkAtrributeChange(element: any, org: any) {
    const aTag = element.getElementsByTagName('a');
    const aOrg = org.getElementsByTagName('a');
    [...aTag].forEach((moded) => {
      [...aOrg].forEach((orgi) => {
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
    setHtml(element.innerHTML);
  }

  function remover(tag: any, ele: any) {
    const tagger = ele.getElementsByTagName(tag);
    for (const ch of tagger) {
      if (ch.previousElementSibling?.tagName === 'DEL') {
        ch.remove();
      }
    }
    setHtml(ele.innerHTML);
  }
  React.useEffect(() => {
    checker(bTag, bTagOrg);
    checker(uTag, uTagOrg);
    checker(iTag, iTagOrg);
    remover('del', el);
    checkAtrributeChange(el, elorg);
  }, [bTag, bTagOrg, uTag, uTagOrg, iTag, iTagOrg]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

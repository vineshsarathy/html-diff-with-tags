import * as React from 'react';
import HtmlDifferent from './usehtmlDiff';
import './style.css';

export default function App() {
  const org = `<ul> <li>Hello Batman, decidee what to do: <a href='#'>asdasd</a></li> <li>Hello Batman, decidee what to do: <a href='#'>asdasd</a></li></ul>`;
  const changed = `<ul> <li>Hello <u>B</u>atman, <b>decidee</b> <a href="23454">what</a> to do: <a href='#'>asdasd</a> </li> <li>Hello Batman, sa what to do: <a href='#'>asdasd</a></li></ul>`;

  return (
    <div>
      <h1>Demo of HTML difference</h1>
      <HtmlDifferent initial={org} modified={changed} />
    </div>
  );
}

export const timeBetweenDates = (date1, date2) => {
  var diff =(new Date(date2).getTime() - new Date(date1).getTime()) / 1000;
  const days = diff /= 60 * 60 * 24;
  return {
    day: Math.floor(days),
    month: Math.floor(days / 30)
  } 
}

export const stripHTMLtags = (html) => {
  //.replace(/<\/?[^>]+(>|$)/g, "")
  html = html.replace(/<br ?\/?>/gm, ' ');
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
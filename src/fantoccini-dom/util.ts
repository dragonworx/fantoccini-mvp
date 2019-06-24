export function getStyle(element: any, cssRule: string) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView
      .getComputedStyle(element, "")
      .getPropertyValue(cssRule);
  } else if (element.currentStyle) {
    cssRule = cssRule.replace(/\-(\w)/g, function(strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = element.currentStyle[cssRule];
  }
  return strValue;
}

export const getNumericStyleValue = (target: HTMLElement, key: string) => {
  const v = parseFloat(target.style.getPropertyValue(key));
  if (isNaN(v)) {
    switch (key) {
      case "left":
        return parseFloat(getStyle(target, "left"));
      case "top":
        return parseFloat(getStyle(target, "top"));
      case "width":
        return target.offsetWidth;
      case "height":
        return target.offsetHeight;
      case "opacity":
        return 1;
    }
  }
  return v;
}

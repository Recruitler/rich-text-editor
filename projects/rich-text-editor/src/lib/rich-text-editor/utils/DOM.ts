
export function isRectEmpty(rect: DOMRect) {

    return rect.x == 0 && rect.y == 0 && rect.right == 0 && rect.bottom == 0;
}

export function focusElementWithRangeIfNotFocused(element: HTMLElement, range: Range) {
    if (document.activeElement !== element) {
        element.focus();

        const selection = window.getSelection();
        selection?.removeAllRanges();
        range && selection?.addRange(range);
    }
}

export function focusElementWithRange(element: HTMLElement, range: Range) {
    if (document.activeElement !== element) {
        element.focus();
    }

    const selection = window.getSelection();
    selection?.removeAllRanges();
    range && selection?.addRange(range);

}


// COMPAT: In Firefox, `caretRangeFromPoint` doesn't exist. (2016/07/25)

export function getRangeFromPosition(x: number, y: number): Range | null {
    let domRange: Range | null = null;
    if (document.caretRangeFromPoint) {
        domRange = document.caretRangeFromPoint(x, y);
    } else {
        const position = (document as any).caretPositionFromPoint(x, y);

        if (position) {
            domRange = document.createRange();
            domRange.setStart(position.offsetNode, position.offset);
            domRange.setEnd(position.offsetNode, position.offset);
        }
    }

    return domRange;
}


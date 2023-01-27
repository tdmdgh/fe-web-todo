
export function newline2br(str) {
    return str.replaceAll('\n', '<br>');
}
export function br2newline(str) {
    return str.replaceAll('<br>', '\n');
}
export function time_diff(date) {
    const now = new Date();
    const time_diff = Math.floor((now.getTime() - date) / 1000 / 60);
    if (time_diff < 1) return '방금 전';
    if (time_diff < 60) {
        return `${time_diff}분 전`;
    }

    const time_diff_hour = Math.floor(time_diff / 60);
    if (time_diff_hour < 24) {
        return `${time_diff_hour}시간 전`;
    }

    const time_diff_day = Math.floor(time_diff_hour / 24);
    if (time_diff_day < 365) {
        return `${time_diff_day}일 전`;
    }

    return `${Math.floor(time_diff_day / 365)}년 전`;
}

export function binarysearch_category(id,category_list){
    let left = 0;
    let right = category_list.length - 1;
    let mid = 0;
    while (left <= right) {
        // 가운데 인덱스
        mid = Math.floor((left + right) / 2);

        if (category_list[mid].id == id) {
            return mid;
        }

        // 대소 비교로 범위 지정
        if (category_list[mid].id > id) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}
export function resize_textarea(obj) {
    obj.style.height = '0px';
    obj.style.height = (obj.scrollHeight) + 'px';
}
export function get_element_index(ele) {

    let _i = 0;
  
    while((ele = ele.previousSibling) != null ) {
  
      _i++;
  
    }
    return _i;
}
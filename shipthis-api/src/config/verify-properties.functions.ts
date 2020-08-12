export function propertyIsValid(key: string): boolean {
  if (
    !key.includes('type') &&
    !key.includes('status') &&
    !key.includes('_id') &&
    !key.includes('date') &&
    !key.includes('language') &&
    !key.includes('gender') &&
    !key.includes('password') &&
    !key.includes('fk') &&
    !key.includes('position') &&
    !key.includes('amount')
  ) {
    return true;
  } else {
    return false;
  }
}

export function propertyTypeIsValid(content: any): boolean {
  if (
    typeof content != 'object' &&
    typeof content != 'boolean' &&
    typeof content != 'number' &&
    typeof content != 'function' &&
    content != undefined
  ) {
    return true;
  } else {
    false;
  }
}

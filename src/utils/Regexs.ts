class Regexs {
  public number = /^[0-9]*$/;
  public positiveNumber = /^[1-9][0-9]*$/;
  public numberRange = /^[0-9]{0,10}$/;
  public optionalEmail = /^(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63})?$/i;
  public email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i;
  public disposition = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  public decimal = /^[0-9]*(\.[0-9]{1,})?$/;
  public decimal2 = /^[0-9]*(\.[0-9]{1,2})?$/;
  public weight = /^$|^[0-9]{1,7}(\.[0-9]{1,2})?$/;
  public positiveDecimal = /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/;
  public NaN = /[^0-9]/g;
  public salary = /^(?:((\d){1,3})([.][\d]{3})+)?$/;
  public phone = /^[0-9]{10}$/;
  public stringWithoutSpecial = /^[a-zA-Z0-9\s]+$/;
  public vietnamese =
    /^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i;

  public isWeight(value?: string): value is string {
    if (typeof value !== 'string') return false;
    return this.weight.test(value);
  }
}

export default new Regexs();

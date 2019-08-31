module.exports = {
  trata_cpf(ObjCPF) {
    return ObjCPF.replace(/\D/g, '');
  },

  
  is_a_number(ObjCPF){
    return !/\D/.test(ObjCPF);
  }
}
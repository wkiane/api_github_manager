module.exports = {
  trata_cpf(ObjCPF) {
    return ObjCPF.replace(/\D/g, '');
  }
}
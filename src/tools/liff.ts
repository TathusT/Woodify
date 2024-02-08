import liff from "@line/liff";

const closeLiff = () => {
  let liffInit: any = liff;
  liffInit.init({
    liffId: "2001173297-AoDv0582",
  });
  return liffInit.closeWindow();;
};

export { closeLiff };

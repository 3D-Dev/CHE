import React, {Fragment} from 'react';
import {Input, Modal} from "antd";

export const ProgramShare = (props) => {
  const QRCode = require('qrcode.react');

  const onDownload = (e) => {
    const canvas = document.getElementById("program-share-qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.setAttribute("download", "qrcode.png"); //or any other extension
    document.body.appendChild(link);
    link.click();
  }

  return (
    <Fragment>
      <Modal
        className={"modal-school"}
        title={null}
        visible={props.isModalVisible}
        onCancel={props.handleCancel}
        footer={null}
        centered
        width={1000}
      >
        <div className={"px-4 py-4"}>
          <div className={"flex items-center pb-4"}>
            <img alt={""} style={{width: 22.6, height: 24.65, marginTop: -6}}
                 src={require('../../assets/images/upload.png')}/>
            <span className={"text-xl font-bold text-black ml-4"}>プログラムの共有</span>
          </div>
          <div className={"rounded-xl bg-yellow-light px-12 py-8"}>
            <div className={"mb-2 flex items-center"}>
              <img alt={""} src={require('../../assets/images/link.png')}/>
              <span
                className={"text-base ml-1 cursor-move"}
                style={{color: '#208BCE'}}
                onClick={() => props.onCopyUrl(props.url)}
              >
                共有用URLをコピー
              </span>
              {
                props.bCopied && (
                  <span className={"bg-blue text-base ml-8 text-white py-2 pl-4 pr-10"}>共有用URLをコピーしました</span>
                )
              }
            </div>
            <div className={"pb-8"}>
              <Input size={"large"} readOnly style={{width: '100%'}} value={props.url}/>
            </div>
            <div className={"flex items-center"}>
              <QRCode
                id={"program-share-qr-code"}
                value={props.url}
                size={128}
              />
              <div className={"ml-8"}>
                <button
                  className={"flex items-center justify-center bg-yellow btn-secondary-semi-round text-black font-bold text-sm h-50px"}
                  style={{width: 315}}
                  onClick={(e) => onDownload(e)}
                >
                  <span>QRコードをダウンロード</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

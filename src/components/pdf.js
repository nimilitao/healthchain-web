import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import '../styles/pdf.css' // Importe seu arquivo CSS de estilos

// URL da API onde você deseja fazer o POST
const apiEndpoint = 'https://sua-api.com/upload-pdf'

// Configure o worker do PDF.js (necessário para renderizar o PDF)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function SendPDF({ pdfPath }) {
  const [numPages, setNumPages] = useState(null)
  const [selectedFileName, setSelectedFileName] = useState('Selecionar exame') // Estado para armazenar o nome do arquivo selecionado

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const uploadedPdfData = e.target.result

        // Atualiza o estado com o nome do arquivo selecionado
        setSelectedFileName(file.name)

        // Enviar o PDF para a API
        fetch(apiEndpoint, {
          method: 'POST',
          body: uploadedPdfData,
        })
          .then((response) => {
            // Lidar com a resposta da API
            if (response.ok) {
              console.log('PDF enviado com sucesso para a API.')
              // Faça algo com a resposta, se necessário.
            } else {
              console.error('Erro ao enviar o PDF para a API.')
            }
          })
          .catch((error) => {
            console.error('Erro ao enviar o PDF para a API:', error)
          })
      }

      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <div className="pdf-uploader">
      <label className="custom-button">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <span className="plus">+</span>
        <span className="nomeExame">{selectedFileName}</span>
      </label>
      {numPages && (
        <div>
          <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} />
          </Document>
          <p>Página 1 de {numPages}</p>
        </div>
      )}
    </div>
  )
}

export default SendPDF

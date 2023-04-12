import React, { useState } from 'react';
import { XMarkIcon, PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Dropzone from 'react-dropzone';

const StandardMessageForm = ({ props, activeChat }) => {
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState('');
    const [preview, setPreview] = useState(''); //previsualizacion de la imagen que se mande por el chat
    const [error, setError] = useState(null); //para saber si hay ocurrido un error con la carga de imagenes

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const date = new Date()
                .toISOString()
                .replace('T', ' ')
                .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`);
            const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
            const form = {
                attachments: at,
                created: date,
                sender_username: props.username,
                text: message,
                activeChatId: activeChat.id,
            };
            props.onSubmit(form);
            setMessage('');
            setAttachment('');
            setError(null); // Si no hubo errores, reseteamos el estado de error
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="message-form-container">
            {preview && (
                <div className="message-form-preview">
                    <img alt="message-form-preview" className="message-form-preview-image" src={preview} onLoad={() => URL.revokeObjectURL(preview)} />
                    <XMarkIcon
                        className="message-form-icon-x"
                        onClick={() => {
                            setPreview('');
                            setAttachment('');
                        }}
                    />
                </div>
            )}

            {error && <div className="message-form-error">{error}</div>}
            
            <div className="message-form">
                {/* Zona para escribir un mnesaje en el chat */}
                <div className="message-form-input-container">
                    <input className="message-form-input" type="text" value={message} onChange={handleChange} placeholder="Send a message..." />
                </div>

                <div className="message-form-icons">
                    {/* Zona para arrastrar un archivo de imagen en el chat */}
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        noClick={true}
                        onDrop={(acceptedFiles) => {
                            setAttachment(acceptedFiles[0]);
                            setPreview(URL.createObjectURL(acceptedFiles[0]));
                        }}
                    >
                        {({ getRootProps, getInputProps, open }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PaperClipIcon className="message-form-icon-clip" onClick={open} />
                            </div>
                        )}
                    </Dropzone>

                    <hr className="vertical-line" />

                    <PaperAirplaneIcon
                        className="message-form-icon-airplane"
                        onClick={() => {
                            setPreview('');
                            handleSubmit();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
export default StandardMessageForm;

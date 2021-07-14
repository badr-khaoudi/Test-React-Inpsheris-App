import Joi from 'joi';

export const LivelyTransferSchema = Joi.object({
  receivedUserUids: Joi.array()
    .items(Joi.string())
    .min(1)
    .required(),
  isSendMail: Joi.boolean().required(),
  isSendPrivateMessage: Joi.boolean().required(),
  title: Joi.string().required(),
  documents: Joi.array()
    .items(
      Joi.object({
        uid: Joi.string().required(),
        isInternal: Joi.boolean().optional(),
        fileName: Joi.string().required(),
        mimeType: Joi.string().required(),
        createdDate: Joi.string().optional(),
        webViewLink: Joi.string().optional(),
        externalSource: Joi.string().optional(),
      }),
    )
    .min(1)
    .required(),
});

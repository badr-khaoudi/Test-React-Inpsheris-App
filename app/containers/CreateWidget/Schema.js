import Joi from 'joi';

const EventItemSchema = Joi.object({
  uid: Joi.string().optional(),
  eventLink: Joi.string()
    .uri()
    .required(),
  eventName: Joi.string().required(),
  fromDate: Joi.date().required(),
  toDate: Joi.date().required(),
});

const AnswerSchema = Joi.object({
  id: Joi.number().optional(),
  answer: Joi.string().required(),
  active: Joi.boolean().required(),
});

const QuestionsSchema = Joi.object({
  id: Joi.number().optional(),
  active: Joi.boolean().required(),
  allowMultipleAnswers: Joi.boolean().required(),
  answers: Joi.array()
    .items(AnswerSchema)
    .min(1)
    .required(),
  question: Joi.string().required(),
});

const OptionsSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  price: Joi.string().required(),
  sequenceNumber: Joi.number().required(),
});

const CreateWidgetSchema = Joi.object({
  uid: Joi.string().optional(),
  displayOption: Joi.string().optional(),
  communityUid: Joi.string().when('displayOption', {
    is: Joi.string()
      .exist()
      .valid('Community'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  title: Joi.string().required(),
  type: Joi.string().required(),
  sequenceNumber: Joi.number().required(),
  active: Joi.boolean().required(),
  content: Joi.string().when('type', [
    {
      is: Joi.string()
        .exist()
        .valid('RSS'),
      then: Joi.required(),
    },
    {
      is: Joi.string()
        .exist()
        .valid('FCKEditor'),
      then: Joi.required(),
      otherwise: Joi.optional(),
    },
  ]),
  imageUids: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('ImageGallery'),
    then: Joi.array()
      .min(1)
      .required(),
    otherwise: Joi.optional(),
  }),
  videos: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('VideoGallery'),
    then: Joi.array()
      .min(1)
      .required(),
    otherwise: Joi.optional(),
  }),
  path: Joi.string().when('type', {
    is: Joi.string()
      .exist()
      .valid('AutomatedCalendar'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  events: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('RegularCalendar'),
    then: Joi.array()
      .items(EventItemSchema)
      .min(1),
  }).when('$defaultWidget', {
    is: Joi.boolean()
      .exist()
      .valid(true),
    then: Joi.optional(),
  }),
  calendarData: Joi.when('$defaultWidget', {
    is: Joi.boolean()
      .exist()
      .valid(true),
    then: Joi.object({
      colors: Joi.array()
        .items(Joi.string())
        .min(6)
        .required(),
    }),
    otherwise: Joi.optional(),
  }),
  questions: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('Poll'),
    then: Joi.array()
      .items(QuestionsSchema)
      .min(1)
      .required(),
    otherwise: Joi.optional(),
  }),
  twitterData: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('Twitter'),
    then: Joi.object({
      associatedAccountName: Joi.string().required(),
      numberOfCount: Joi.number()
        .min(1)
        .max(200)
        .required(),
      screenName: Joi.string().required(),
    }),
    otherwise: Joi.optional(),
  }),
  food: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('Twitter'),
    then: Joi.object({
      description: Joi.string().required(),
      id: Joi.number(),
      imageUid: Joi.string().required(),
      options: Joi.array()
        .items(OptionsSchema)
        .min(1)
        .required(),
    }),
    otherwise: Joi.optional(),
  }),
  countdownClockData: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('CountdownClock'),
    then: Joi.object({
      endDate: Joi.date().required(),
      endMessage: Joi.string().required(),
      startMessage: Joi.string().required(),
      url: Joi.string()
        .uri()
        .required(),
    }),
    otherwise: Joi.optional(),
  }),
  bikeBooking: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('BikeBooking'),
    then: Joi.object({
      id: Joi.number().optional(),
      imageUid: Joi.string().required(),
      title: Joi.string().required(),
    }),
    otherwise: Joi.optional(),
  }),
  link: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('LivelyForm'),
    then: Joi.object({
      formid: Joi.string().required(),
      imageUid: Joi.string().required(),
      title: Joi.string().required(),
      url: Joi.string()
        .uri()
        .required(),
    }),
    otherwise: Joi.optional(),
  }),
  newcomerData: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('Newcomer'),
    then: Joi.object({
      isShowAllUsers: Joi.boolean().required(),
      isShowCommunityFollowers: Joi.boolean().required(),
      numberOfUser: Joi.number().required(),
    }),
    otherwise: Joi.optional(),
  }),
  linkedinData: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('LinkedIn'),
    then: Joi.object({
      associatedAccountName: Joi.string().required(),
      numberOfCount: Joi.number()
        .min(1)
        .max(200)
        .required(),
    }),
    otherwise: Joi.optional(),
  }),
  youtubeData: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('Youtube'),
    then: Joi.object({
      associatedAccountName: Joi.string().required(),
      channelId: Joi.string().required(),
      numberOfCount: Joi.number()
        .min(1)
        .max(50)
        .required(),
    }),
    otherwise: Joi.optional(),
  }),
  instagramData: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('Instagram'),
    then: Joi.object({
      associatedAccountName: Joi.string().required(),
      numberOfCount: Joi.number()
        .min(1)
        .max(10000)
        .required(),
    }),
    otherwise: Joi.optional(),
  }),
  facebookData: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('Facebook'),
    then: Joi.object({
      associatedAccountName: Joi.string().required(),
      hideCover: Joi.boolean().required(),
      pageUrl: Joi.string().required(),
      showFacepile: Joi.boolean().required(),
      smallHeader: Joi.boolean().required(),
    }),
    otherwise: Joi.optional(),
  }),
  dailymotionData: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('Dailymotion'),
    then: Joi.object({
      associatedAccountName: Joi.string().required(),
      numberOfCount: Joi.number()
        .min(1)
        .max(100)
        .required(),
      screenName: Joi.string().required(),
    }),
    otherwise: Joi.optional(),
  }),
});

export { CreateWidgetSchema };

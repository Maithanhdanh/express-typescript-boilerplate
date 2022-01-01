const SupportedPipelineTools = {
  GITHUB: 'github',
  CIRCLECI: 'circleci',
};

const PipelinePathMapper = {
  [SupportedPipelineTools.GITHUB]: '.github/workflows',
  [SupportedPipelineTools.CIRCLECI]: '.circleci',
};

const PipelineConfigMapper = {
  [SupportedPipelineTools.GITHUB]: `${
    PipelinePathMapper[SupportedPipelineTools.GITHUB]
  }/nodejs.yml`,
  [SupportedPipelineTools.CIRCLECI]: `${
    PipelinePathMapper[SupportedPipelineTools.CIRCLECI]
  }/config.yml`,
};

const GIT_REPO =
  'https://github.com/Maithanhdanh/express-typescript-boilerplate.git';

module.exports = {
  SupportedPipelineTools,
  GIT_REPO,
  PipelinePathMapper,
  PipelineConfigMapper,
};

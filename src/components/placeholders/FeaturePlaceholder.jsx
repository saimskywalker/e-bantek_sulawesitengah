const FeaturePlaceholder = ({ featureName, description }) => (
  <div className="container p-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">{featureName}</h1>
      <p className="text-secondary mb-8">{description}</p>
      <div className="demo-card mx-auto">
        <div className="p-6">
          <div className="text-6xl mb-4">🚧</div>
          <p className="font-semibold mb-2">Coming Soon</p>
          <p className="text-sm text-secondary">
            Fitur ini sedang dalam tahap pengembangan dan akan segera tersedia.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturePlaceholder;
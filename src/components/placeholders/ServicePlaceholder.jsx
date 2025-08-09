const ServicePlaceholder = ({ serviceName }) => (
  <div className="container p-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">{serviceName}</h1>
      <p className="text-secondary mb-8">
        Halaman ini sedang dalam pengembangan. Segera hadir dengan fitur lengkap!
      </p>
      <div className="demo-card mx-auto">
        <div className="p-6">
          <h3 className="font-semibold mb-4">Fitur yang akan tersedia:</h3>
          <ul className="text-left text-secondary space-y-2">
            <li>• Analytics terintegrasi</li>
            <li>• Form input data</li>
            <li>• Laporan otomatis</li>
            <li>• Integrasi dengan sistem lain</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default ServicePlaceholder;
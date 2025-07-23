export function ManagerDashboard() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>
      <iframe
        title="Power BI Report"
        width="100%"
        height="600"
        src="https://app.powerbi.com/view?r=your-embed-url"
        frameBorder="0"
        allowFullScreen={true}
      />
    </div>
  );
}


//this is manager ka landing page : Reports , compare location 

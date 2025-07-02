const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto max-w-xl space-y-6 px-4">
    {children}
  </div>
);

export default Container;

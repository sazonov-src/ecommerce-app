interface Props {
  headerTitle?: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}

const Section = ({ headerTitle, headerContent, children }: Props) => (
  <section className="mb-8">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">{headerTitle}</h3>
      {headerContent}
    </div>
    {children}
  </section>
);

export default Section;

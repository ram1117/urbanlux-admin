interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-light text-dark">
      {children}
    </main>
  );
};

export default AuthLayout;

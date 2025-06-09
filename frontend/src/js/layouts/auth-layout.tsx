import { AuthCardLayout } from "@/js/layouts/auth/auth-card-layout";
export function AuthLayout({
  children,
  title,
  description,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <AuthCardLayout title={title} description={description} {...props}>
      {children}
    </AuthCardLayout>
  );
}

// import { AuthSimpleLayout } from "@/js/layouts/auth/auth-simple-layout";
// export function AuthLayout({
//   children,
//   title,
//   description,
//   ...props
// }: {
//   children: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <AuthSimpleLayout title={title} description={description} {...props}>
//       {children}
//     </AuthSimpleLayout>
//   );
// }

// import { AuthSplitLayout } from "@/js/layouts/auth/auth-split-layout";
// export function AuthLayout({
//   children,
//   title,
//   description,
//   appName,
//   quote,
//   ...props
// }: {
//   children: React.ReactNode;
//   title: string;
//   description: string;
//   appName: string;
//   quote?: {
//     message: string;
//     author: string;
//   };
// }) {
//   return (
//     <AuthSplitLayout
//       title={title}
//       description={description}
//       appName={appName}
//       quote={quote}
//       {...props}
//     >
//       {children}
//     </AuthSplitLayout>
//   );
// }

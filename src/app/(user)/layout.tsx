import NavbarUser from "@/components/User/NavbarUser";
import FooterUser from "@/components/User/FooterUser";
import AuthGuard from "@/components/User/AuthGuard"; // Import satpamnya

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="min-h-screen flex flex-col bg-[#FDFBF5]">
                <NavbarUser />
                <main className="flex-grow">
                    {children}
                </main>
                <FooterUser />
            </div>
        </AuthGuard>
    );
}
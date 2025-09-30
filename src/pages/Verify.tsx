import { CertificateUploadForm } from "@/components/CertificateUploadForm";
import { useAuth } from "@/auth/auth";

export default function Verify() {
  const { user } = useAuth();
  const allowBulk = user?.role !== "citizen";

  return <CertificateUploadForm allowBulk={allowBulk} />;
}

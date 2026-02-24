import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/auth/LogoutButton";

export const metadata = {
  title: "My Profile | Vedic Origins",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-primary">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center text-4xl mx-auto mb-3 border-2 border-accent">
              👤
            </div>
            <h1 className="text-2xl font-serif font-bold text-darkBrown">
              My Profile
            </h1>
            <p className="text-secondary text-sm">Vedic Origins Member</p>
          </div>

          {/* User Info */}
          <div className="space-y-4 mb-8">
            <div className="bg-cream rounded-xl p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                Email Address
              </p>
              <p className="text-darkBrown font-medium">{user.email}</p>
            </div>
            <div className="bg-cream rounded-xl p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                Member Since
              </p>
              <p className="text-darkBrown font-medium">{joinedDate}</p>
            </div>
            <div className="bg-cream rounded-xl p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                Account Status
              </p>
              <p className="text-green-600 font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                Active
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Coming Soon
            </p>
            <div className="opacity-50 cursor-not-allowed bg-gray-100 rounded-xl p-4 text-sm text-gray-500">
              ✏️ Edit Profile (Name, Phone, Address)
            </div>
            <div className="opacity-50 cursor-not-allowed bg-gray-100 rounded-xl p-4 text-sm text-gray-500">
              📦 My Orders
            </div>
          </div>

          {/* Logout */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <LogoutButton className="w-full min-h-[44px] bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors px-4 py-3 text-center" />
          </div>
        </div>
      </div>
    </div>
  );
}

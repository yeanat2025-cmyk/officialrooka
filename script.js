setTimeout(() => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // যদি ইউজার লগইন থাকে তবে হোমে যাবে
                    window.location.href = "home.html";
                } else {
                    // লগইন না থাকলে লগইন পেজে যাবে
                    window.location.href = "login.html";
                }
            });
        }, 3000); // ৩০০০ মিলি-সেকেন্ড = ৩ সেকেন্ড
package io.ieucourses.app;

// import android.os.Build;
// import android.os.Bundle;
// import android.view.View;
// import android.view.WindowManager;

// import com.getcapacitor.BridgeActivity;

// public class MainActivity extends BridgeActivity {
//     @Override
//         public void onCreate(Bundle savedInstanceState) {
//             super.onCreate(savedInstanceState);

//         // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//         //     View decorView = getWindow().getDecorView();
//         //     decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
//         // }

//         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
//             getWindow().setNavigationBarColor(getResources().getColor(R.color.black));
//         }

//             // getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
//             registerPlugin(com.getcapacitor.community.stripe.StripePlugin.class);
//         }
// }


import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set the navigation bar background color to #A50000
        getWindow().setNavigationBarColor(Color.parseColor("#920000"));

        // Set navigation bar icons color to white
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE // Keep layout stable
            );
        }
    }
}


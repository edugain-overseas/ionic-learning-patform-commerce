package io.ieucourses.app;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set up google auth plugin
         registerPlugin(GoogleAuth.class);

        // Set the navigation bar background color
        getWindow().setNavigationBarColor(Color.parseColor("#920000"));

//         Set navigation bar icons color to white and keep layout stable
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            );
        }
    }
}



//package io.ieucourses.app;
//
//import android.os.Build;
//import android.os.Bundle;
//import android.view.View;
//import android.view.WindowInsetsController;
//import android.view.WindowManager;
//import androidx.core.content.ContextCompat;
//import androidx.core.view.WindowInsetsControllerCompat;
//import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
//import com.getcapacitor.BridgeActivity;
//
//public class MainActivity extends BridgeActivity {
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//
//        // Register Google Auth plugin
//        registerPlugin(GoogleAuth.class);
//
//        // Set up navigation bar and status bar appearance
//        setupSystemBars();
//    }
//
//    private void setupSystemBars() {
//        // Set navigation bar background color to #920000
//        getWindow().setNavigationBarColor(0xFF920000);  // Set navigation bar to #920000 color (dark red)
//
//        // Set navigation bar icons to white for better visibility on red background
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
//                // API 30+ (Android 11+): Use WindowInsetsControllerCompat
//                WindowInsetsControllerCompat insetsController = new WindowInsetsControllerCompat(getWindow(), getWindow().getDecorView());
//                insetsController.setAppearanceLightNavigationBars(false); // Use dark icons to contrast with red background
//            } else {
//                // API 26–29: Use legacy flags
//                int flags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
//                getWindow().getDecorView().setSystemUiVisibility(flags);
//            }
//        }
//
//        // Ensure status bar is transparent for overlay functionality
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
//            getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
//            getWindow().setStatusBarColor(android.graphics.Color.TRANSPARENT); // Make status bar transparent
//        }
//
//        // Set the status bar icons to light mode for contrast against a transparent background
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
//                // API 30+ (Android 11+): Use WindowInsetsControllerCompat
//                WindowInsetsControllerCompat insetsController = new WindowInsetsControllerCompat(getWindow(), getWindow().getDecorView());
//                insetsController.setAppearanceLightStatusBars(true); // Use light icons for visibility
//            } else {
//                // API 23–29: Use legacy flags
//                int flags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
//                getWindow().getDecorView().setSystemUiVisibility(flags);
//            }
//        }
//    }
//}



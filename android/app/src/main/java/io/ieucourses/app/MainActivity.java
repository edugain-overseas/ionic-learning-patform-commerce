package io.ieucourses.app;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;

import androidx.activity.EdgeToEdge;
import androidx.core.view.WindowInsetsControllerCompat;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // EdgeToEdge.enable(this);
        getWindow().setNavigationBarColor(Color.parseColor("#920000"));


        // Set up google auth plugin
         registerPlugin(GoogleAuth.class);



        // Set the navigation bar background color
//        getWindow().setNavigationBarColor(Color.parseColor("#920000"));

//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
//                // API 30+ (Android 11+): Use WindowInsetsControllerCompat
//                WindowInsetsControllerCompat insetsController = new WindowInsetsControllerCompat(getWindow(), getWindow().getDecorView());
//                insetsController.setAppearanceLightNavigationBars(true); // Use light icons for visibility
//            } else {
//                // API 23–29: Use legacy flags
//                getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
//            }


//         Set navigation bar icons color to white and keep layout stable
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            getWindow().getDecorView().setSystemUiVisibility(
//                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//            );
//        }
    }
}




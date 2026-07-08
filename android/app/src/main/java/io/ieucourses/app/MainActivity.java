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
        getWindow().setNavigationBarColor(Color.parseColor("#5F1314"));


        // Set up google auth plugin
         registerPlugin(GoogleAuth.class);
    }
}




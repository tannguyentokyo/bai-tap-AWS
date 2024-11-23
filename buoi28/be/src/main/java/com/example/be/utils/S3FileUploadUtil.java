package com.example.be.utils;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Objects;

@Slf4j
@Service("ApplicationS3FileUploadUtil")
public class S3FileUploadUtil {
  private final AmazonS3 s3Client;
//  @Value("${bucket.name}")
  private String bucketName = "todoappdemo";

//  @Value("${bucket.accessKey}")
  private String accessKey = "";

//  @Value("${bucket.secretKey}")
  private String secretKey = "";

//  @Value("${bucket.region}")
  private String region = "ap-northeast-1";

  public S3FileUploadUtil() {
    System.out.println(region);
    this.s3Client =
        AmazonS3ClientBuilder.standard()
            .withRegion(region)
            .disableChunkedEncoding()
            .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
            .withPathStyleAccessEnabled(true)
            .build();
  }

  @SneakyThrows
  public String uploadImage(MultipartFile imageFile) {
    File file = convertMultipartToFile(imageFile);
    String fileName = generateFileName(imageFile);
    String s3Key = "images/" + fileName;

    PutObjectRequest request = new PutObjectRequest(bucketName, s3Key, file);
    s3Client.putObject(request);

    file.delete();

    return generateS3Link(s3Key);
  }

  @SneakyThrows
  private File convertMultipartToFile(MultipartFile file) {
    File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
    FileOutputStream fos = new FileOutputStream(convertedFile);
    fos.write(file.getBytes());
    fos.close();
    return convertedFile;
  }

  private String generateFileName(MultipartFile multiPart) {
    String originalFileName = Objects.requireNonNull(multiPart.getOriginalFilename());
    return System.currentTimeMillis() + "-" + originalFileName.replace(" ", "_");
  }

  private String generateS3Link(String fileName) {
    return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;
  }
}

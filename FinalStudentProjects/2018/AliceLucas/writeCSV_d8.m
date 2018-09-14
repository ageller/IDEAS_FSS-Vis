a = imread('temple.png');
%a = a(1:460,:,:);
%experiment with downscale
b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/d8_2/temple.csv',c)

a = imread('temple_1.png');
%a = a(1:460,:,:);
%experiment with downscale
b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/d8_2/temple_1.csv',c)


a = imread('children.png');
%a = a(1:460,:,:);
%experiment with downscale
b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/d8_2/children.csv',c)


a = imread('agriculture.png');
%a = a(1:460,:,:);
%experiment with downscale
b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/d8_2/agriculture.csv',c)


a = imread('lizzard.png');
%a = a(1:460,:,:);
%experiment with downscale
b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/d8_2/lizzard.csv',c)


a = imread('tiger.png');
%a = a(1:460,:,:);
%experiment with downscale
b=imresize(a,0.125);
%Crop out lower border which includes "Harmonic" text
c = reshape(b, [size(b,1)*size(b,2),3]);
csvwrite('./csv_files/d8_2/tiger.csv',c)

